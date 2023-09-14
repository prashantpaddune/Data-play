import {Container} from "@/components/Error/styles";

const Error = ({ error }) => {
    return (
        <Container>
            <h1>⚠️️</h1>
            <p>{error}</p>
        </Container>
    )
}

export default Error;