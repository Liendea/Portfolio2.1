import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";

type PageBuilderSection = textBlockType | contactBlockType;

type contactPageData = {
  _id: string;
  title: string;
  slug: string;
  pageBuilder: PageBuilderSection[];
};

type textBlockType = {
  _type: "textBlock";
  pageTitle: string;
  ingress: string;
};

type contactItem = {
  displayText: string;
  url?: string;
};
type contactBlockType = {
  _type: "contactBlock";
  title: string;
  contactItems: contactItem[];
};

export default async function ContactPage() {
  const contactQuery = groq`
*[_type == "page" && slug.current == "contact"][0] { 
    _id, 
    title, 
    "slug": slug.current, 
    
    // Hämta hela Page Builder arrayen
    pageBuilder[] { ..., // Hämta alla syandardfält (inkl _key och _type)
    
    _type == "textBlock" => {
    pageTitle,
    ingress
    },
        _type == "contactBlock" => {
         
            title,
            "contactItems": contactFields[] {
            displayText, url
            }  ,  
        },
    }
}`;

  const contact: contactPageData | null = await client.fetch(contactQuery);
  console.log(contact);

  return (
    <section className="contact-section">
      {contact?.pageBuilder.map(
        (section: PageBuilderSection, index: number) => {
          switch (section._type) {
            case "textBlock":
              return (
                <div className="contact-content" key={index}>
                  <h2 className="page-title">{section.pageTitle}</h2>
                  <p className="body-text">{section.ingress}</p>
                </div>
              );

            case "contactBlock":
              // Type Assertion för att undvika TS-fel vid åtkomst av unika fält
              const contactBlock = section as contactBlockType;

              return (
                <div key={index} className="contact-block">
                  {/* Hämta rubriken */}
                  <p className="contact-title">{contactBlock.title}</p>

                  <div className="contact-fields">
                    {/* Loopa över arrayen från section-objektet */}
                    {contactBlock.contactItems?.map(
                      (item: contactItem, i: number) => (
                        <div key={i} className="contact-field-wrapper">
                          {item.url ? (
                            // Rendera som länk om URL finns

                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="contact-field"
                            >
                              {item.displayText}
                            </a>
                          ) : (
                            // Rendera som paragraf/text om URL saknas
                            <p className="contact-field">{item.displayText}</p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              );

            default:
              return null;
          }
        }
      )}
    </section>
  );
}
