import {Helmet} from 'react-helmet'

type SEOProps = {
    title: string
}

const SEO = (
    {
        title
    }: SEOProps
) => {

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </>
    )
}

export default SEO