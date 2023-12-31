import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Post } from "../../models/Post";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Heading, Text } from "@chakra-ui/layout";
import axios from "axios";

export type PostDetailViewProps = {
  data: Post;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get("http://localhost:1337/api/posts");
  const posts: Post[] = await response.data.data;
  const paths = posts.map((post) => {
    return {
      params: { id: String(post.id) },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);
  const { data } = await axios.get(
    `http://localhost:1337/api/posts/${params.id}`
  );

  return {
    props: {
      data: data.data,
    },
  };
};

const PostDetailView = ({ data }: PostDetailViewProps) => {
  const router = useRouter();

  return (
    <>
      <Box padding="10">
        <Button onClick={() => router.back()}>Back</Button>
        <Heading>{data.attributes.title}</Heading>
        <Text>{data.attributes.publishedAt}</Text>
        <Divider marginTop="10" marginBottom="10"></Divider>
        <Text>{data.attributes.content}</Text>
      </Box>
    </>
  );
};

export default PostDetailView;
