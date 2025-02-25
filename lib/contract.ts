import { ethers } from "ethers"

export const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS"

export const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function stakedBalance(address) view returns (uint256)",
  "function rewards(address) view returns (uint256)",
  "function stake(uint256) external",
  "function unstake(uint256) external",
  "function claimRewards() external",
  "function transfer(address, uint256) external returns (bool)",
  "function admin() view returns (address)",
  "function mint(address, uint256) external",
  "function burn(uint256) external",
  "function updateCommunityFund(address) external",
  "function updateRewardRate(uint256) external",
  "function updateCommunityFeePercentage(uint256) external",
  "function withdrawFromCommunityFund(uint256) external",
  "function transferAdmin(address) external",
  "function communityFeePercentage() view returns (uint256)",
]

// Helper function to get contract instance
export function getContract(provider: ethers.providers.Web3Provider) {
  const signer = provider.getSigner()
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

// Format large numbers for display
export function formatAmount(amount: ethers.BigNumber) {
  return ethers.utils.formatEther(amount)
}

// Parse string amounts to BigNumber
export function parseAmount(amount: string) {
  return ethers.utils.parseEther(amount)
}

