import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

const Mission = () => {
  const data: RegularPage = getListPage("mission/_index.md");
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
        canonical="https://inspir.uk/mission"
      />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="md:col-10 lg:col-8">
              <h1
                dangerouslySetInnerHTML={markdownify(title)}
                className="h2 mb-8 text-center"
              />
              <div className="content prose prose-lg max-w-none">
                <MDXContent content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mission;
