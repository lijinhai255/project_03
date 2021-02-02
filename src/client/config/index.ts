import ApolloClient from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http'
// 默认为当前域名
const serverDomain = '';

function getGraphqlClient(): ApolloClient<unknown> {
  // console.log(serverDomain,"serverDomain-serverDomain")
  return new ApolloClient({
    uri: `${serverDomain}/graphql`
  });
}
// 用于获取CSS数据的链接
function getCssDataUrl(): ApolloClient<unknown> {
  console.log(serverDomain,"serverDomain-serverDomain")
  return new ApolloClient({
    uri: `${serverDomain}/cssData`
  });
}
// const client = new ApolloClient({
//   link: createHttpLink({ 
//     uri: '你的GraphQL服务链接' 
//   })
// })

const config = {
  serverDomain,
  getGraphqlClient,
  getCssDataUrl
};

export default config;
