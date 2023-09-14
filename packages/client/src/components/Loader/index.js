import { Container } from "@/components/Loader/styles";

const Loader = (props) => {
    return (
        <Container {...props}>
            <div className="spinner"/>
        </Container>
    )
}

export default Loader;