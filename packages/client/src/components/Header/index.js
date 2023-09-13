import { Header, Title, Description, PlayButton, PlayIcon } from './styles';

const HeaderSection = ({ onClick = () => {}, loading = false }) => {
    return (
        <Header>
            <div className="header-title">
                <Title>Data Play</Title>
                <Description>Your sandbox for SQL mastery</Description>
            </div>
            <PlayButton onClick={onClick} disabled={loading}>
                <PlayIcon>▶</PlayIcon> Play
            </PlayButton>
        </Header>
    );
};

export default HeaderSection;