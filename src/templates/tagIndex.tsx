import { graphql } from "gatsby";
import React from "react";

import Icon from "../components/icon";
import Layout from "../components/layout";
import { PostIndexPosts, PostIndex } from "../components/postIndex";
import SEO from "../components/seo";
import { TagListTags, TagList } from "../components/tagList";

import TagIcon from "../assets/icons/tag.svg";

// Page context to be provided from ../gatsby/createPages.ts
export interface TagIndexPageContext {
  sourceInstanceName: string;
  tag: string;
}

// Automatic (exported) GraphQL query
export const tagIndexQuery = graphql`
  query($sourceInstanceName: String, $tag: String) {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      ...PostIndexPosts
    }
    tagList: allMdx(
      filter: { fields: { sourceInstanceName: { eq: $sourceInstanceName } } }
    ) {
      ...TagListTags
    }
  }
`;

// TypeScript-typed fields corresponding to automatic (exported) GraphQL query
interface TagIndexData {
  posts: PostIndexPosts;
  tagList: TagListTags;
}

// Component definition
const TagIndexPage: React.FunctionComponent<{
  pageContext: TagIndexPageContext;
  data: TagIndexData;
}> = ({ pageContext, data }) => {
  const tag = pageContext.tag;

  return (
    <Layout>
      <SEO title={tag} />
      <PostIndex
        posts={data.posts}
        header={
          <div className="f3 tl mt3">
            <Icon sprite={TagIcon} className="w1 h1 v-bottom" />
            {` `} {tag}
            <span className="accent-mono ml2">oldest to newest</span>
          </div>
        }
      />

      <div className="center tl mw7 ph3">
        <span className="mr3">Other tags:</span>
        <TagList
          sourceInstanceName={pageContext.sourceInstanceName}
          tags={data.tagList}
          removeTags={[tag]}
        />
      </div>
    </Layout>
  );
};

export default TagIndexPage;
