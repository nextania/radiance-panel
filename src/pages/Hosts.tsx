import { createSignal } from 'solid-js'
import { Button } from "../components/Button/Button.tsx";
import Host from "../components/Host.tsx";
import { styled } from "solid-styled-components";
import { FiPlus } from "solid-icons/fi";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;  
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeadingLarge = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
`;
const SubheadingLarge = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: white;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const HostsContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    width: 100%;
    max-width: 1000px;
  }
`;

const Hosts = () => {

  return (
    <>
      <HostsContainer>
        <Header>
          <Section>
            <HeadingLarge>Hosts</HeadingLarge>
            <SubheadingLarge>Manage your proxy hosts</SubheadingLarge>
          </Section>
          <Section>
            <Button Icon={<FiPlus />} text="Add new host" />
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
      </HostsContainer>
    </>
  )
}

export default Hosts;
