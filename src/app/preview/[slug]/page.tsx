import Preview from "../page";

const GeneratePreviewPage = async ({
  params,
}: {
  params: { slug: string };
}): Promise<any> => {
  const { slug } = await params;
  return <Preview pageId={slug} />;
};

export default GeneratePreviewPage;
