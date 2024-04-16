import { render, screen } from "@testing-library/react";
import NFTCard from "./NFTCard";
import { NFT } from "../../types";

describe("NFTCard", () => {
  test("renders NFT card with name and template mint", () => {
    const nft: NFT = {
      name: "Test NFT",
      template_mint: "123",
      data: {
        img: "test.png",
        name: "",
      },
      collection: {
        collection_name: "",
        name: "",
        img: "",
      },
    };
    render(<NFTCard index={0} nft={nft} />);
    expect(screen.getByText("Test NFT")).toBeInTheDocument();
    expect(screen.getByText("#123")).toBeInTheDocument();
  });

  test("renders NFT card without template mint if mint is 0", () => {
    const nft: NFT = {
      name: "Test NFT",
      template_mint: "0",
      data: {
        img: "test.png",
        name: "",
      },
      collection: {
        collection_name: "",
        name: "",
        img: "",
      },
    };
    render(<NFTCard index={0} nft={nft} />);
    expect(screen.getByText("Test NFT")).toBeInTheDocument();
    expect(screen.queryByText("#0")).toBeNull();
  });
});
