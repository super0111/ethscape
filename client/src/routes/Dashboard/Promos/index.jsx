import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { StoreContext } from 'store/Store';

import { BACKEND, Strings } from 'support/Constants';

import { SectionHeader } from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';
import FormCardItem from 'components/Card/FormCardItem';
import FileUploadForm from 'components/Form/FileUploadForm';
import { Button } from 'components/Button';
import Loader from 'components/Loader';

const Promos = () => {
  const { token, lang, setModalOpen, setPostType } = useContext(StoreContext)
  document.title = 'EthScape | ' + Strings.profileSettings[lang]

  const [file, setFile] = useState([])
  const [uploading, setUploading] = useState(false)
  const [clearFiles, setClearFiles] = useState(false)

  const getFile = (files) => {
    setClearFiles(false)
    setFile(files)
  }

  useEffect(() => {
    if (clearFiles) {
      setFile([])
    }
  }, [clearFiles])

  const upload = () => {
    if (uploading) return
    if (!file.length) return

    setUploading(true)

    const formData = new FormData()
    formData.append('promo', file[0])

    fetch(BACKEND() + '/api/promo/create', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: formData
    })
      .then(() => {
        setClearFiles(true)
        setUploading(false)
      })
      .catch(err => toast.error(err.message === '[object Object]' ? 'Error' : err.message))
  }

  const openModal = () => {
    setPostType({
      type: 'editEventBanner',
      id: null
    })
    setModalOpen(true)
  }

  return (
    <>
      <Breadcrumbs current={Strings.promos[lang]} links={[
        { title: Strings.home[lang], link: '/' },
        { title: Strings.dashboard[lang], link: '/dashboard' },
      ]} />

      <SectionHeader title={Strings.promos[lang]} />

      <FileUploadForm
        title={Strings.uploadPromoPicture[lang]}
        hint={`${Strings.accepted[lang]}: png, jpg, jpeg, gif; ${Strings.maxFilesCount[lang]}: 1; ${Strings.maxSize[lang]}: 20 Mb`}
        multiple={false}
        accept="image/jpeg,image/png,image/gif"
        sendFiles={getFile}
        clearFiles={clearFiles}
      />

      <div className="card_item">
        {uploading
          ? <Loader className="btn main" />
          : <Button text={Strings.upload[lang]} onClick={upload} className="main hollow" />
        }
      </div>

      <FormCardItem title={Strings.eventBannerChange[lang]}>
        <div className="form_block">
          <div className="text_show_more" onClick={openModal}>{Strings.changeEventBanner[lang]}</div>
        </div>
      </FormCardItem>
    </>
  )
}

export default Promos;
