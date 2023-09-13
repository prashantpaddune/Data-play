import { Header, Title, Description, PlayButton, PlayIcon } from './styles';

const HeaderSection = () => {
    return (
        <Header>
            <div className="header-title">
                <Title>Data Play</Title>
                <Description>Your sandbox for SQL mastery</Description>
            </div>
            <PlayButton>
                <PlayIcon>▶</PlayIcon> Play
            </PlayButton>
        </Header>
    );
}

export default HeaderSection;