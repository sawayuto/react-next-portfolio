import { MetadataRoute } from 'next';
import { getAllCategoryList, getAllNewsList } from './_libs/microcms';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  'http://localhost:3000';
const buildUrl = (path?: string) => `${baseUrl}${path ?? ''}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let newsContents: Awaited<ReturnType<typeof getAllNewsList>> = [];
  let categoryContents: Awaited<ReturnType<typeof getAllCategoryList>> = [];

  try {
    newsContents = await getAllNewsList();
  } catch (error) {
    console.error('Failed to fetch news contents for sitemap:', error);
  }

  try {
    categoryContents = await getAllCategoryList();
  } catch (error) {
    console.error('Failed to fetch category contents for sitemap:', error);
  }

  const newsUrls: MetadataRoute.Sitemap = newsContents.map((content) => ({
    url: buildUrl(`/news/${content.id}`),
    lastModified: content.revisedAt,
  }));
  const categoryUrls: MetadataRoute.Sitemap = categoryContents.map(
    (content) => ({
      url: buildUrl(`/news/category/${content.id}`),
      lastModified: content.revisedAt,
    })
  );

  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl('/members'),
      lastModified: now,
    },
    {
      url: buildUrl('/contact'),
      lastModified: now,
    },
    {
      url: buildUrl('/news'),
      lastModified: now,
    },
    ...newsUrls,
    ...categoryUrls,
  ];
}
