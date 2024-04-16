import { FC, useState } from "react";
import "./App.sass";
import { Collection, NFT } from "./types";
import { fetchNFTs } from "./utils/fetch-nfts";
import { SearchBar, NFTList } from "./components";

const App: FC = () => {
  const [accountName, setAccountName] = useState<string>("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleNFTsFetch = async () => {
    if (!accountName.trim()) {
      setError("Please enter an account name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data: NFT[] = await fetchNFTs(accountName);

      if (data.length === 0) {
        setError("No NFTs found for this account.");
        setCollections([]);
        return;
      }

      const isValidData = data.every(
        (nft) =>
          nft.name &&
          nft.collection &&
          nft.collection.name &&
          nft.data &&
          nft.data.img
      );

      if (!isValidData) {
        throw new Error("Invalid data format received from the server.");
      }

      const groupedByCollection: { [key: string]: NFT[] } = {};

      data.forEach((nft: NFT) => {
        const collectionName = nft.collection.name;
        if (!groupedByCollection[collectionName]) {
          groupedByCollection[collectionName] = [];
        }
        groupedByCollection[collectionName].push(nft);
      });

      const collectionsArray: Collection[] = Object.keys(
        groupedByCollection
      ).map((key) => ({
        name: key,
        nfts: groupedByCollection[key],
      }));

      setCollections(collectionsArray);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      setError("Failed to fetch NFTs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>NFT Finder</h1>
      <SearchBar
        loading={loading}
        query={accountName}
        onQueryChange={(e) => setAccountName(e.target.value)}
        onSearchClick={handleNFTsFetch}
      />
      <NFTList loading={loading} error={error} collections={collections} />
    </div>
  );
};

export default App;
