import { Button } from "../components/Button.tsx";
import CertificateCard from "../components/Certificate.tsx";
import { FiPlus } from "solid-icons/fi";
import { useTranslate } from "../i18n";
import { Container, Content, Header, HeadingLarge, Section, SubheadingLarge } from "../components/Layout.tsx";
import { useClient } from "../context.tsx";
import { createResource, For, Show } from "solid-js";
import type { Certificate } from "../api/routes.ts";

const Tls = () => {
  const t = useTranslate();
  const client = useClient();
  
  const [certificates] = createResource(async () => {
    const certsData = await client.getCertificates();
    return Object.entries(certsData).map(([id, cert]) => ({
      id,
      ...cert
    })).sort((a, b) => {
      const domainA = getCertificateDomain(a.config);
      const domainB = getCertificateDomain(b.config);
      return domainA.localeCompare(domainB);
    });
  });
  
  const getCertificateDomain = (cert: Certificate) => {
    if (cert.type === "managed") {
      return cert.remote_id;
    }
    return cert.id;
  };
  
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
          <Show when={!certificates.loading} fallback={<div>Loading...</div>}>
            <For each={certificates()}>
              {(cert) => (
                <CertificateCard
                  domain={getCertificateDomain(cert.config)} 
                  status="valid" 
                  expiresIn={`${cert.days_remaining.toFixed().toString() } days`}
                />
              )}
            </For>
          </Show>
        </Content>
      </Container>
    </>
  )
}

export default Tls;