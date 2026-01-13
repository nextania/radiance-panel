import logo from "../assets/radiance.svg";
import { styled } from "solid-styled-components";
import { useTranslate } from "../i18n";
import Select from "../components/Select";
import { createMemo, createResource, ErrorBoundary, For, Show } from "solid-js";
import { useGlobalState } from "../context";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { FiKey } from "solid-icons/fi";
import { Client } from "../api";
import { intoRenderableError, type RequestError, type ServerError } from "../api/errors";

const LoginBg = styled.div`
    background: linear-gradient(to top, #7c2d12, #581c87, #111827);
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
`;

const Wave = styled.svg`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 60%;
    overflow: hidden;
`;

const Sun = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    width: 16rem; 
    height: 16rem;  
    background-color: #ea580c; 
    border-radius: 9999px;
    filter: blur(64px);
    opacity: 0.4;
`;

const Star = styled.div`
    position: absolute;
    background-color: #ffffff;
    border-radius: 9999px;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const LoginAside = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
    @media (max-width: 750px) {
        display: none;
    }
`;

const LoginForm = styled.div`
    flex: 1;
    background-color: rgba(0,0,0, 0.6);
    backdrop-filter: blur(20px);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const createStars = () => {
    const starArray = [];
    for (let i = 0; i < 50; i++) {
        starArray.push(
            <Star
                style={{
                    width: Math.random() * 2 + 1 + "px",
                    height: Math.random() * 2 + 1 + "px",
                    top: Math.random() * 60 + "%",
                    left: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.7 + 0.3,
                    "animation-duration": Math.random() * 3 + 2 + "s",
                    "animation-delay": Math.random() * 2 + "s",
                }}
            />
        );
    }
    return starArray;
};
const STARS = createStars();

const Heading = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
`;

const Subheading = styled.div`
    color: lightgray;
    font-size: 1rem;
    font-weight: 300;
`;

const HeadingLarge = styled.div`
    padding: 2rem;
    font-size: 2.5rem;
    font-weight: 500;
    color: white;
    text-shadow: 
    0 0 10px #777, /* h-shadow, v-shadow, blur-radius, color */
    0 0 20px #777,
    0 0 30px #777;
`;
const SubheadingLarge = styled.div`
    padding: 2rem;
    font-size: 1.25rem;
    font-weight: 300;
    color: #ddd;
`;

const LoginMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    animation: fadeUpIn 0.5s ease-out;
    
    @keyframes fadeUpIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginSpacer = styled.div`
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;

const LoginFooter = styled.div`
    margin-top: 1rem;
    font-size: 0.75rem;
    color: #666;
`;

const Spacer = styled.hr`
    width: 100%;
    border: 1px solid var(--border-color-light);
    border-radius: 9999px;
`;

const Login = () => {
    const state = createMemo(() => useGlobalState());
    const t = useTranslate();
    const [capabilities] = createResource(() => Client.getCapabilities());
    
    const login = () => {
        console.log("Logging in with password..."); 
    };
    return (
        <Show when={t("generic")}>
            <LoginBg>
                <Sun />
                {STARS}
                <Wave xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="black" fill-opacity="0.5" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </Wave>
                <Wave xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ transform: 'translateY(40px)' }}>
                    <path fill="black" fill-opacity="0.4" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,101.3C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </Wave>
                <Wave xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ transform: 'translateY(80px)' }}>
                    <path fill="black" fill-opacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </Wave>
                <LoginForm>
                    <LoginSpacer />
                    <LoginMain>
                        <img src={logo} alt="Radiance logo" height="80" />
                        <TextGroup>
                            <Heading>{t("login.login")}</Heading>
                            <Subheading>{t("login.welcomeBack")}</Subheading>
                        </TextGroup>
                        <ErrorBoundary fallback={(e: ServerError | RequestError) => <div>{t(intoRenderableError(e))}</div>}>
                            <Show when={!capabilities()}>
                                <div>{t("generic.loading")}</div>
                            </Show>
                            <Show when={capabilities()?.oidcProviders && capabilities()!.oidcProviders.length > 0}>
                                <For each={capabilities()!.oidcProviders}>{(provider) => 
                                    <Button Icon={() => <img src={provider.logoPath} alt={`${provider.displayName} logo`} />} text={() => t("login.loginWith", { provider: provider.displayName })!} onClick={() => {
                                        window.location.href = provider.authPath;
                                    }} />
                                }</For>
                            </Show>
                            <Show when={capabilities()?.oidcProviders && capabilities()!.oidcProviders.length > 0 && capabilities()?.passwordAuthentication}>
                                <Spacer />
                            </Show>
                            <Show when={capabilities()?.passwordAuthentication}>
                                <Input type="password" placeholder={t("login.password")} />
                                <Button Icon={FiKey} text={t("login.loginWithPassword")!} onClick={login} />
                            </Show>
                        </ErrorBoundary>
                    </LoginMain>
                    <LoginSpacer>
                        <Select options={[{
                            value: "en",
                            label: `${t("languages.en")!} (English)`,
                        }, {
                            value: "zh-CN",
                            label: `${t("languages.zh-CN")!} (简体中文)`,
                        }]} value={state().get("sessionData")?.language || "en"} onChange={(val) => {
                            state().update("sessionData", { language: val });
                            localStorage.setItem("language", val);
                        }}  />
                        
                        <LoginFooter>
                            {t("brand.copyright", { year: new Date().getFullYear() })}
                        </LoginFooter>
                    </LoginSpacer>
                </LoginForm>    
                <LoginAside>
                    <HeadingLarge>{t("brand.welcome")}</HeadingLarge>
                    <SubheadingLarge>{t("brand.tagline")}</SubheadingLarge>
                </LoginAside>
            </LoginBg>
        </Show>
    )
}

export default Login;
