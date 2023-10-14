interface NFT {
  id: string;
  authorities: Array<any>; // Replace 'any' with the actual type
  burnt: boolean;
  compression: {
    eligible: boolean;
    compressed: boolean;
    data_hash: string;
    creator_hash: string;
    asset_hash: string;
    // Add other properties as needed
  };
  content: {
    $schema: string;
    files: Array<any>; // Replace 'any' with the actual type
    json_uri: string;
    links: {
      image: string;
    };
    metadata: {
      description: string;
      name: string;
      symbol: string;
      token_standard: string;
    };
  };
  creators: Array<any>; // Replace 'any' with the actual type
  grouping: Array<any>; // Replace 'any' with the actual type
  interface: string;
  mutable: boolean;
  // Add other properties as needed
}

export default NFT;
