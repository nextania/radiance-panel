import { createSignal } from 'solid-js'
import { Button } from "../components/Button.tsx";
import Host from "../components/Host.tsx";
import { styled } from "solid-styled-components";
import { FiPlus } from "solid-icons/fi";
import { useTranslate } from "../i18n";
import { Container, Content, Header, HeadingLarge, Section, SubheadingLarge } from '../components/Layout.tsx';



const Hosts = () => {
  const t = useTranslate();
  return (
    <>
      <Container>
        <Header>
          <Section>
            <HeadingLarge>{t("navigation.hosts")}</HeadingLarge>
            <SubheadingLarge>{t("hosts.manage")}</SubheadingLarge>
          </Section>
          <Section>
            <Button Icon={FiPlus} text={() => t("hosts.addHost")!} />
          </Section>
        </Header>
        <Content>
          <Host hostname="example.com" enabled={true} tls={true} />
          <Host hostname="cloud.example.com" enabled={true} tls={true} />
          <Host hostname="demo.example.com" enabled={false} tls={false} />
          <Host hostname="dns.example.com" enabled={true} tls={true} />
          <Host hostname="panel.example.com" enabled={true} tls={true} />
          <Host hostname="sso.example.com" enabled={true} tls={true} />
        </Content>
      </Container>
    </>
  )
}

export default Hosts;
