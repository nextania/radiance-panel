import { Button } from "../components/Button.tsx";
import Host from "../components/Host.tsx";
import { FiPlus } from "solid-icons/fi";
import { useTranslate } from "../i18n";
import { Container, Content, Header, HeadingLarge, Section, SubheadingLarge } from "../components/Layout.tsx";
import { useClient } from "../context.tsx";
import { createResource, For, Show } from "solid-js";

const Hosts = () => {
  const t = useTranslate();
  const client = useClient();
  
  const [hosts] = createResource(async () => {
    const hostsData = await client.getHosts();
    return Object.entries(hostsData).map(([id, host]) => ({
      id,
      ...host
    })).sort((a, b) => a.domains[0].localeCompare(b.domains[0]));
  });
  
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
          <Show when={!hosts.loading} fallback={<div>Loading...</div>}>
            <For each={hosts()}>
              {(host) => (
                <Host 
                  hostnames={host.domains} 
                  enabled={host.enabled} 
                  certificate={host.tls_cert_id ?? undefined} 
                />
              )}
            </For>
          </Show>
        </Content>
      </Container>
    </>
  )
}

export default Hosts;
