import { useContext } from 'react';
import { StoreContext } from 'store/Store';
import { Strings } from 'support/Constants';

import { Section, SectionHeader } from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';

import './style.css';

const Rules = () => {
  const { lang } = useContext(StoreContext)

  return (
    <Section>
      <Breadcrumbs current={Strings.rules[lang]} links={[
        { title: Strings.home[lang], link: '/' },
        { title: Strings.forum[lang], link: '/forum' },
      ]} />

      <SectionHeader title={Strings.ethscapeRules[lang]} />
      <div className="rules">
        <p>🚫No hate speech or discrimination of any kind</p>
        <p>🚫No bullying, degrading, or personal attacks against other Spacelink members</p>
        <p>🚫No unsolicited direct messaging</p>
        <p>🚫No NSFW content</p>
        <p>🚫No scamming or hacking</p>
        <p>🚫No doxxing, leaking, spreading, or publishing of private information
            <br></br>(i.e., personal information, location, identification, social media, etc.)</p>
        <p>🚫No Spam</p>
        <p>🚫No unauthorized bots (spam bots)</p>
        <p>🚫No impersonation</p>
        <p>🚫No Alternate accounts</p>
        <p>🚫No ban evading</p>
        <p>🚫No filter evading</p>
        <p>🚫No political, religious, or highly controversial content
            <br></br>(i.e., propaganda, discussions, nicknames, profile pictures, public statuses, etc.)</p>
        <p>🚫No illegal activities</p>
        <p>🚫No invites or advertisements</p>
        <p>🚫No Pump and Dump campaigns</p>
        <p>🚫DO NOT ping staff or members without reasonable cause to do so</p>

        <br></br>
        
        <p>✅Keep discussions on topic and related to intended channel topics</p>
        <p>✅Inform admins of suspicious or unacceptable activity</p>
        <p>✅Be respectful</p>

        <br></br>

        <p>⚠️Be careful when trading. Trade only with those you know and trust</p>
        <p>⚠️Take your personal security seriously</p>
        <p>⚠️Proceed with Caution when confronted with unsolicited private messages on any platform</p>
        <p>⚠️Be cautious about clicking links</p>
        <p>⚠️Be aware that we (staff of Ethscape) will never ask you for personal information, including passwords, or private information regarding NFTs</p>
      </div>
    </Section>
  )
}

export default Rules;
