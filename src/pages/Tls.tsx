import { Button } from "../components/Button.tsx";
import Certificate from "../components/Certificate.tsx";
import { FiPlus } from "solid-icons/fi";
import { useTranslate } from "../i18n";
import { Container, Content, Header, HeadingLarge, Section, SubheadingLarge } from "../components/Layout.tsx";

const Tls = () => {
  const t = useTranslate();
  return (
    <>
      <Container>
        <Header>
          <Section>
            <HeadingLarge>{t("navigation.tls")}</HeadingLarge>
            <SubheadingLarge>{t("tls.manage")}</SubheadingLarge>
          </Section>
          <Section>
            <Button Icon={FiPlus} text={() => t("tls.addCertificate")!} />
          </Section>
        </Header>
        <Content>
          <Certificate domain="example.com" status="valid" expiresIn="90 days" />
          <Certificate domain="*.example.com" status="valid" expiresIn="85 days" />
          <Certificate domain="cloud.example.com" status="valid" expiresIn="60 days" />
          <Certificate domain="demo.example.com" status="expiring" expiresIn="15 days" />
          <Certificate domain="old.example.com" status="expired" />
          <Certificate domain="panel.example.com" status="valid" expiresIn="120 days" />
        </Content>
      </Container>
    </>
  )
}

export default Tls;