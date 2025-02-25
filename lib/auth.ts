// Authentication utility functions
export function isAdmin(address: string | null, adminAddress: string): boolean {
  if (!address) return false
  return address.toLowerCase() === adminAddress.toLowerCase()
}

// Store vendor data in localStorage (in a real app, this would be in a database/blockchain)
export function storeVendorData(address: string, data: any) {
  localStorage.setItem(`vendor-${address.toLowerCase()}`, JSON.stringify(data))
}

export function getVendorData(address: string) {
  const data = localStorage.getItem(`vendor-${address.toLowerCase()}`)
  return data ? JSON.parse(data) : null
}

export function isVendor(address: string | null): boolean {
  if (!address) return false
  return Boolean(getVendorData(address))
}

