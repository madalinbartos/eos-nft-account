import { FC } from "react";
import { Collection } from "../../types";
import { NFTCard } from "../NFTCard";
import "./NFTList.sass";

interface NFTListProps {
  loading: boolean;
  error: string;
  collections: Collection[];
}

const NFTList: FC<NFTListProps> = ({ loading, error, collections }) => {
  if (loading) {
    return <div id="spinner" className="spinner" />;
  } else if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      {collections.map((collection, index) => (
        <div className="collection" key={index}>
          <h2>{collection.name}</h2>
          <div className="nft-grid">
            {collection.nfts.map((nft, index) => (
              <NFTCard index={index} nft={nft} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NFTList;
