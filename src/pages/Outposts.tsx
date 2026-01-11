import { Button } from "../components/Button.tsx";
import { FiPlus } from "solid-icons/fi";
import { useTranslate } from "../i18n";
import { Container, Content, Header, HeadingLarge, Section, SubheadingLarge } from "../components/Layout.tsx";
import Outpost from "../components/Outpost.tsx";

const Outposts = () => {
  const t = useTranslate();
  return (
    <>
      <Container>
        <Header>
          <Section>
            <HeadingLarge>{t("navigation.outposts")}</HeadingLarge>
            <SubheadingLarge>{t("outposts.manage")}</SubheadingLarge>
          </Section>
          <Section>
            <Button Icon={FiPlus} text={() => t("outposts.addOutpost")!} />
          </Section>
        </Header>
        <Content>
            <Outpost identifier="outpost-1" enabled={true} up={true} />
            <Outpost identifier="outpost-2" enabled={false} up={false} />
            <Outpost identifier="outpost-3" enabled={true} up={false} />
            <Outpost identifier="outpost-4" enabled={false} up={true} />
        </Content>
      </Container>
    </>
  )
}

export default Outposts;