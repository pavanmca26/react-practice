// src/payload.js
export function createPayload() {
  return {
    product: {
      productId: null,
      productName: "Organic Carrot",
      productDescription: "Crunchy organic carrots",
      productIngredients: "Carrot",
      aboutProduct: "Locally farmed",
      moreInfo: "Wash before use",
      remarks: "Root vegetable"
    },
    productPacks: [
      {
        productPackId: null,
        productId: null,
        packSize: "250g",
        productQuantity: 150,
        pricePerPack: 80.0,
        remarks: "snack size",
        manufactureInfo: {
          manufactureId: null,
          productPackId: null,
          manufactureDate: "2026-01-20",
          manufacturerDetails: "Growers Co-op",
          manufactureName: "Growers Co-op",
          manufactureInfo: null,
          remarks: null
        },
        expiryInfo: {
          expiryId: null,
          productPackId: null,
          expiryDate: "2026-07-30",
          remarks: "best before"
        },
        photos: [
          {
            photoId: null,
            productPackId: null,
            productId: null,
            photoUrls: ["https://example.com/photos/carrot1.jpg"],
            photoAltText: "Bag of organic carrots",
            remarks: "front"
          }
        ],
        prices: {
          priceId: null,
          productPackId: null,
          price: 79.0,
          remarks: "MRP"
        },
        discounts: {
          discountId: null,
          productPackId: null,
          discountPercentage: 15.0,
          discountStartDate: "2026-04-01",
          discountEndDate: "2026-04-07",
          remarks: "Easter offer"
        },
        stockInfo: {
          stockId: null,
          productPackId: null,
          productId: null,
          productName: "Organic Carrot",
          productStatus: true,
          remarks: "Cold storage"
        }
      }
    ]
  };
}