const { Types } = require('mongoose');
const createError = require('http-errors');
const { isJapanese, toRomaji } = require('wanakana');
const request = require('request');
const ethers = require('ethers');

const ERC20_ABI = require('../abis/ERC20_ABI.json');
const User = require('../models/User');
const AuthHistory = require('../models/AuthHistory');

const { registerSchema, loginSchema } = require('../utils/validationSchema');
const { signAccessToken } = require('../utils/jwt');
const toLatin = require('../utils/transliterate');

const register = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync(req.body)

    const processRegistration = async () => {
      let name = result.username.trim()
      if (/[а-яА-ЯЁё]/.test(name)) {
        name = toLatin(name)
      }
      if (isJapanese(name)) {
        name = toRomaji(name)
      }

      const forbiddenNames = [
        'admin', 'administrator', 'moder', 'moderator', 'deleted', 'user', 'test', 'qwerty', '12345', '123456789', '1234567890'
      ]
      const testName = name.toLowerCase();
      if (forbiddenNames.find(i => i === testName)) {
        throw createError.Conflict('Username is prohibited')
      }

      const userNamedoesExist = await User.findOne({ name })
      if (userNamedoesExist) {
        throw createError.Conflict('Username is already been registered')
      }

      const emailDoesExist = await User.findOne({ email: result.email })
      if (emailDoesExist) {
        throw createError.Conflict('E-mail is already been registered')
      }

      let displayName = result.username

      const now = new Date().toISOString()

      const user = new User({
        name,
        displayName,
        email: result.email,
        password: result.password,
        createdAt: now,
        onlineAt: now,
        address: null,
        ethscapeBalance: '0',
        totalSupplyPercentage: 0
      })
      const savedUser = await user.save()
      const accessToken = await signAccessToken(savedUser)

      const authHistory = new AuthHistory({
        user: savedUser._id,
        loginAt: now,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        ua: req.headers['user-agent']
      })
      await authHistory.save()

      res.json({
        user: {
          id: savedUser._id,
          name: savedUser.name,
          displayName: savedUser.displayName,
          picture: savedUser.picture,
          role: savedUser.role
        },
        accessToken
      })
    }

    if (process.env.NODE_ENV === 'production') {
      const secretKey = process.env.RECAPTCHA_SECRET

      // req.connection.remoteAddress will provide IP address of connected user.
      var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.recaptchaValue + "&remoteip=" + req.connection.remoteAddress;
      // Hitting GET request to the URL, Google will respond with success or error scenario.
      request(verificationUrl, function(error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
          return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        }
        processRegistration()
      });
    } else {
      processRegistration()
    }
  } catch(error) {
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}

const forumLogin = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body)

    let name = result.username
    if (/[а-яА-ЯЁё]/.test(name)) {
      name = toLatin(name)
    }
    if (isJapanese(name)) {
      name = toRomaji(name)
    }

    const populate = {
      path: 'ban',
      select: '_id expiresAt',
    }
    const user = await User.findOne({ name }).populate(populate)

    if (!user) throw createError.NotFound('User not registered')

    const isMatch = await user.isValidPassword(result.password)
    if (!isMatch) throw createError.Unauthorized('Username or password not valid')

    const now = new Date().toISOString()

    if (user.ban) {
      if (user.ban.expiresAt < now) {
        await User.updateOne({ _id: Types.ObjectId(user._id) }, { ban: null })
      } else {
        return res.json({
          ban: {
            userId: user._id,
          }
        })
      }
    }

    const accessToken = await signAccessToken(user)

    const authHistory = new AuthHistory({
      user: user._id,
      loginAt: now,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      ua: req.headers['user-agent']
    })
    await authHistory.save()

    let updatedUser = user;

    if (user.address) {
      updatedUser = await updateUserEthscapeBalance(user, next)
    }

    res.json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        displayName: updatedUser.displayName,
        picture: updatedUser.picture,
        role: updatedUser.role,
        address: updatedUser.address,
        ethscapeBalance: updatedUser.ethscapeBalance,
        totalSupplyPercentage: updatedUser.totalSupplyPercentage
      },
      accessToken
    })
  } catch(error) {
    if (error.isJoi === true) {
      return next(createError.BadRequest('Invalid username or password'))
    }
    next(error)
  }
}

const gameLogin = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body)

    let name = result.username
    if (/[а-яА-ЯЁё]/.test(name)) {
      name = toLatin(name)
    }
    if (isJapanese(name)) {
      name = toRomaji(name)
    }

    const populate = {
      path: 'ban',
      select: '_id expiresAt',
    }
    const user = await User.findOne({ name }).populate(populate)

    if (!user) throw createError.NotFound('User not registered')

    const isMatch = await user.isValidPassword(result.password)
    if (!isMatch) throw createError.Unauthorized('Username or password not valid')

    let updatedUser = user;

    if (user.address && (user.role === 2 || user.role === 1)) { // admins skip login sync for rank testing
      updatedUser = await updateUserEthscapeBalance(user, next)
    }

    // const now = new Date().toISOString()

    /* todo: Need to determine if forum ban equals game ban
    if (user.ban) {
      if (user.ban.expiresAt < now) {
        await User.updateOne({ _id: Types.ObjectId(user._id) }, { ban: null })
      } else {
        return res.json({
          ban: {
            userId: user._id,
          }
        })
      }
    }
    */

    /* Add this back in once we check that the game client is setting x-forwarded-for headers
    const authHistory = new AuthHistory({
      user: user._id,
      loginAt: now,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      ua: req.headers['user-agent']
    })
    await authHistory.save()
    */

    res.json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        displayName: updatedUser.displayName,
        address: updatedUser.address,
        ethscapeBalance: updatedUser.ethscapeBalance,
        totalSupplyPercentage: updatedUser.totalSupplyPercentage
      }
    })
  } catch(error) {
    if (error.isJoi === true) {
      return next(createError.BadRequest('Invalid username or password'))
    }
    next(error)
  }
}

const updateUserEthscapeBalance = async (user, next) => {
  try {
    const ethscapeContractAddress = '0xd9b2f4ea4a44b8543edd4898247e374d2642726a';
    const provider = new ethers.providers.EtherscanProvider("homestead", process.env.ETHERSCAN);
    const address = user.address
    const ethscapeContract = new ethers.Contract(ethscapeContractAddress, ERC20_ABI, provider)
  
    const precision = 10*Math.pow(10, 9)
    const tokenBalance = await ethscapeContract.balanceOf(address)
    const tokenUnits = await ethscapeContract.decimals()
    const totalSupply = await ethscapeContract.totalSupply()

    // Precision upscale is used due to etherjs BigNumber not able to store floating point numbers from division
    const totalSupplyPercentage = tokenBalance.mul(precision).div(totalSupply).toNumber() / precision * 100
    const balance = ethers.utils.formatUnits(tokenBalance, tokenUnits)

    const updatedUser = await User.findByIdAndUpdate({ _id: Types.ObjectId(user._id) },
      {
        ethscapeBalance: balance,
        totalSupplyPercentage: totalSupplyPercentage,
      },
      {new: true}
    )
    return updatedUser
  } catch(err) {
    next(createError.InternalServerError(err))
  }
}

module.exports = { register, forumLogin, gameLogin }
