interface NFTCollection {
  collection_name: string;
  name: string;
  img: string;
}

interface NFTData {
  img: string;
  name: string;
}

interface NFT {
  name: string;
  collection: NFTCollection;
  data: NFTData;
  template_mint?: string;
}

interface Collection {
  name: string;
  nfts: NFT[];
}

export type { NFTCollection, NFTData, NFT, Collection };
