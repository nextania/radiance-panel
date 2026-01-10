import { styled } from "solid-styled-components";
import Setting from "../components/Setting";
import { FiSettings } from "solid-icons/fi";

const SettingsContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    width: 100%;
    max-width: 1000px;
  }
  gap: 1rem;
`;



const Settings = () => {
  return (
    <SettingsContainer>
      <Setting
        type="button"
        label="Listen ports"
        description="Configure the ports the server listens on."
        buttonLabel="Configure"
        Icon={FiSettings}
      />
      <Setting
        type="toggle"
        label="Allow self-signed certificates"
        description="Allow upstream servers to use self-signed certificates."
        value={false}
      />
      <Setting
        type="toggle"
        label="Enable HTTP/3"
        description="Enable or disable HTTP/3 (QUIC) support."
        value={true}
      />
      <Setting
        type="toggle"
        label="Enable detailed logging"
        description="Enable or disable detailed logging for troubleshooting."
        value={true}
      />
    </SettingsContainer>
  );
};

export default Settings;