import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`); //** 모든 폴더 안에, * : typeDefs.js로 끝나는 모든파일
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

// const loadedResolvers = loadFilesSync(
//     `${__dirname}/**/*.{queries,mutations}.js`
// ); //{queries,mutations} space가 들어가면 안됨

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
