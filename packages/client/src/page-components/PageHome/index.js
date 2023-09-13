import HeaderSection from "@/components/Header";
import useGetQueryExecute from "@/hooks/useGetQueryExecute";

export default function PageHome() {
    const { handleExecute, loading} = useGetQueryExecute();


    return (
        <section>
            <HeaderSection onClick={handleExecute} loading={loading}/>
        </section>
    )
};
