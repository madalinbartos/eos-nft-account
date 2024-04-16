import { queryByAttribute, render, screen } from "@testing-library/react";
import NFTList from "./NFTList";
import { Collection } from "../../types";

describe("NFTList", () => {
  test("renders loading spinner when loading is true", () => {
    const getById = queryByAttribute.bind(null, "id");

    const { container } = render(
      <NFTList loading={true} error="" collections={[]} />
    );
    expect(getById(container, "spinner")).toBeInTheDocument();
  });

  test("renders error message when error is present", () => {
    render(
      <NFTList loading={false} error="Failed to fetch NFTs" collections={[]} />
    );
    expect(screen.getByText("Failed to fetch NFTs")).toBeInTheDocument();
  });

  test("renders collections and NFT cards when data is present", () => {
    const collections: Collection[] = [
      {
        name: "Collection 1",
        nfts: [
          {
            name: "NFT 1",
            template_mint: "123",
            data: {
              img: "img1.png",
              name: "",
            },
            collection: {
              collection_name: "",
              name: "",
              img: "",
            },
          },
        ],
      },
      {
        name: "Collection 2",
        nfts: [
          {
            name: "NFT 2",
            template_mint: "456",
            data: {
              img: "img2.png",
              name: "",
            },
            collection: {
              collection_name: "",
              name: "",
              img: "",
            },
          },
        ],
      },
    ];
    render(<NFTList loading={false} error="" collections={collections} />);
    expect(screen.getByText("Collection 1")).toBeInTheDocument();
    expect(screen.getByText("NFT 1")).toBeInTheDocument();
    expect(screen.getByText("NFT 2")).toBeInTheDocument();
  });
});
