import gql from 'graphql-tag';
import config from '../config';

interface IallHouses {
  allHouses: cdFang.IhouseData[];
}

interface Ipvs {
  pvs: number;
}

const { getGraphqlClient, getCssDataUrl } = config;

export function requestData(year: string, callback: (...args: any[]) => void): void {
  const yearParam = year === 'home' ? '0' : year;
  console.log(gql, "gql-gql")
  getGraphqlClient()
    .query<IallHouses>({
      query: gql`
        {
          allHouses(year: ${yearParam}) {
            _id
            area
            name
            number
            beginTime
            endTime
            status
          }
        }
      `
    })
    .then(result => {
      callback(result.data.allHouses);
    });
}

export function getCssData(callback: (...args: any[]) => void): void {
  // getGraphqlClient()
  console.log("getCssDatagetCssDatagetCssDatagetCssData")
  // getCssDataUrl()
  //   .query<IallHouses>({
  //     query: gql`
  //     {
  //       AllCss(label: CSS {
  //         _id
  //         area
  //         name
  //         number
  //         beginTime
  //         endTime
  //         status
  //       }
  //     }
  //   `
  //   })
  //   .then(result => {
  //     callback(result)
  //   })
  // .query()
}

export function requestPvs(callback: (...args: any[]) => void): void {
  getGraphqlClient()
    .query<Ipvs>({
      query: gql`
        {
          pvs(routerName: "allHouses")
        }
      `
    })
    .then(result => {
      callback(result.data.pvs);
    });
}
