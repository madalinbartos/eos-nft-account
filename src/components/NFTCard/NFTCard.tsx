import { FC } from "react";
import { NFT } from "../../types";
import "./NFTCard.sass";

interface NFTCardProps {
  index: number;
  nft: NFT;
}

const NFTCard: FC<NFTCardProps> = ({ index, nft }) => {
  return (
    <div className="nft-card" key={index}>
      <img src={`https://ipfs.io/ipfs/${nft.data.img}`} alt={nft.name} />
      <p>
        <b>{nft.name}</b>
      </p>
      {nft.template_mint !== "0" && <p>#{nft.template_mint}</p>}
    </div>
  );
};

export default NFTCard;
