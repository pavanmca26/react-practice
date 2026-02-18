import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * ProductForm
 * - dynamic list of product packs
 * - nested fields for manufactureInfo, expiryInfo, photos (list of urls), prices, discounts, stockInfo
 */
export default function ProductForm({ onSubmit, submitting }) {
  const [product, setProduct] = useState({
    productId: null,
    productName: '',
    productDescription: '',
    productIngredients: '',
    aboutProduct: '',
    moreInfo: '',
    remarks: ''
  });

  const emptyPack = () => ({
    productPackId: null,
    productId: null,
    packSize: '',
    productQuantity: 0,
    pricePerPack: null,
    remarks: '',
    manufactureInfo: {
      manufactureId: null,
      productPackId: null,
      manufactureDate: '',
      manufacturerDetails: '',
      manufactureName: '',
      manufactureInfo: null,
      remarks: null
    },
    expiryInfo: {
      expiryId: null,
      productPackId: null,
      expiryDate: '',
      remarks: ''
    },
    photos: [
      {
        photoId: null,
        productPackId: null,
        productId: null,
        photoUrls: [''],
        photoAltText: '',
        remarks: ''
      }
    ],
    prices: {
      priceId: null,
      productPackId: null,
      price: null,
      remarks: ''
    },
    discounts: {
      discountId: null,
      productPackId: null,
      discountPercentage: 0.0,
      discountStartDate: '',
      discountEndDate: '',
      remarks: null
    },
    stockInfo: {
      stockId: null,
      productPackId: null,
      productId: null,
      productName: '',
      productStatus: true,
      remarks: ''
    }
  });

  const [packs, setPacks] = useState([emptyPack()]);

  // helpers
  const updateProduct = (field, value) => setProduct(p => ({ ...p, [field]: value }));

  const updatePack = (index, field, value) => {
    setPacks(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const updateNested = (index, nested, field, value) => {
    setPacks(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [nested]: { ...copy[index][nested], [field]: value } };
      return copy;
    });
  };

  const addPack = () => setPacks(prev => [...prev, emptyPack()]);
  const removePack = (i) => setPacks(prev => prev.filter((_, idx) => idx !== i));

  const addPhotoUrl = (packIndex, photoIndex) => {
    setPacks(prev => {
      const copy = [...prev];
      copy[packIndex].photos[photoIndex].photoUrls.push('');
      return copy;
    });
  };

  const removePhotoUrl = (packIndex, photoIndex, urlIndex) => {
    setPacks(prev => {
      const copy = [...prev];
      const urls = copy[packIndex].photos[photoIndex].photoUrls;
      urls.splice(urlIndex, 1);
      if (urls.length === 0) urls.push('');
      return copy;
    });
  };

  const updatePhotoUrl = (packIndex, photoIndex, urlIndex, value) => {
    setPacks(prev => {
      const copy = [...prev];
      copy[packIndex].photos[photoIndex].photoUrls[urlIndex] = value;
      return copy;
    });
  };

  const addPhoto = (packIndex) => {
    setPacks(prev => {
      const copy = [...prev];
      copy[packIndex].photos.push({
        photoId: null,
        productPackId: null,
        productId: null,
        photoUrls: [''],
        photoAltText: '',
        remarks: ''
      });
      return copy;
    });
  };

  const removePhoto = (packIndex, photoIndex) => {
    setPacks(prev => {
      const copy = [...prev];
      copy[packIndex].photos.splice(photoIndex, 1);
      if (copy[packIndex].photos.length === 0) addPhoto(packIndex);
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!product.productName || product.productName.trim() === '') {
      alert('Product name is required');
      return;
    }
    if (packs.length === 0) {
      alert('At least one product pack is required');
      return;
    }

    // Build payload: keep null IDs so backend generates them
    const payload = {
      product: {
        productId: product.productId,
        productName: product.productName,
        productDescription: product.productDescription,
        productIngredients: product.productIngredients,
        aboutProduct: product.aboutProduct,
        moreInfo: product.moreInfo,
        remarks: product.remarks
      },
      productPacks: packs.map(p => ({
        productPackId: p.productPackId,
        productId: p.productId,
        packSize: p.packSize,
        productQuantity: p.productQuantity,
        pricePerPack: p.pricePerPack,
        remarks: p.remarks,
        manufactureInfo: {
          manufactureId: p.manufactureInfo.manufactureId,
          productPackId: p.manufactureInfo.productPackId,
          manufactureDate: p.manufactureInfo.manufactureDate,
          manufacturerDetails: p.manufactureInfo.manufacturerDetails,
          manufactureName: p.manufactureInfo.manufactureName,
          manufactureInfo: p.manufactureInfo.manufactureInfo,
          remarks: p.manufactureInfo.remarks
        },
        expiryInfo: {
          expiryId: p.expiryInfo.expiryId,
          productPackId: p.expiryInfo.productPackId,
          expiryDate: p.expiryInfo.expiryDate,
          remarks: p.expiryInfo.remarks
        },
        photos: p.photos.map(ph => ({
          photoId: ph.photoId,
          productPackId: ph.productPackId,
          productId: ph.productId,
          photoUrls: ph.photoUrls.filter(u => u && u.trim() !== ''),
          photoAltText: ph.photoAltText,
          remarks: ph.remarks
        })),
        prices: {
          priceId: p.prices.priceId,
          productPackId: p.prices.productPackId,
          price: p.prices.price,
          remarks: p.prices.remarks
        },
        discounts: {
          discountId: p.discounts.discountId,
          productPackId: p.discounts.productPackId,
          discountPercentage: p.discounts.discountPercentage,
          discountStartDate: p.discounts.discountStartDate,
          discountEndDate: p.discounts.discountEndDate,
          remarks: p.discounts.remarks
        },
        stockInfo: {
          stockId: p.stockInfo.stockId,
          productPackId: p.stockInfo.productPackId,
          productId: p.stockInfo.productId,
          productName: p.stockInfo.productName,
          productStatus: p.stockInfo.productStatus,
          remarks: p.stockInfo.remarks
        }
      }))
    };

    onSubmit(payload);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Product</legend>
        <label>
          Name
          <input value={product.productName} onChange={e => updateProduct('productName', e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={product.productDescription} onChange={e => updateProduct('productDescription', e.target.value)} />
        </label>
        <label>
          Ingredients
          <input value={product.productIngredients} onChange={e => updateProduct('productIngredients', e.target.value)} />
        </label>
        <label>
          About
          <input value={product.aboutProduct} onChange={e => updateProduct('aboutProduct', e.target.value)} />
        </label>
        <label>
          More info
          <input value={product.moreInfo} onChange={e => updateProduct('moreInfo', e.target.value)} />
        </label>
        <label>
          Remarks
          <input value={product.remarks} onChange={e => updateProduct('remarks', e.target.value)} />
        </label>
      </fieldset>

      <fieldset>
        <legend>Product Packs</legend>
        {packs.map((p, i) => (
          <div key={i} className="pack">
            <h4>Pack #{i + 1}</h4>
            <label>
              Pack size
              <input value={p.packSize} onChange={e => updatePack(i, 'packSize', e.target.value)} required />
            </label>
            <label>
              Quantity
              <input type="number" value={p.productQuantity} onChange={e => updatePack(i, 'productQuantity', parseInt(e.target.value || 0, 10))} />
            </label>
            <label>
              Price per pack
              <input type="number" step="0.01" value={p.pricePerPack ?? ''} onChange={e => updatePack(i, 'pricePerPack', e.target.value ? parseFloat(e.target.value) : null)} />
            </label>
            <label>
              Remarks
              <input value={p.remarks} onChange={e => updatePack(i, 'remarks', e.target.value)} />
            </label>

            <details>
              <summary>Manufacture Info</summary>
              <label>
                Manufacture Date
                <input type="date" value={p.manufactureInfo.manufactureDate} onChange={e => updateNested(i, 'manufactureInfo', 'manufactureDate', e.target.value)} />
              </label>
              <label>
                Manufacturer Name
                <input value={p.manufactureInfo.manufactureName} onChange={e => updateNested(i, 'manufactureInfo', 'manufactureName', e.target.value)} />
              </label>
              <label>
                Manufacturer Details
                <input value={p.manufactureInfo.manufacturerDetails} onChange={e => updateNested(i, 'manufactureInfo', 'manufacturerDetails', e.target.value)} />
              </label>
            </details>

            <details>
              <summary>Expiry Info</summary>
              <label>
                Expiry Date
                <input type="date" value={p.expiryInfo.expiryDate} onChange={e => updateNested(i, 'expiryInfo', 'expiryDate', e.target.value)} />
              </label>
              <label>
                Remarks
                <input value={p.expiryInfo.remarks} onChange={e => updateNested(i, 'expiryInfo', 'remarks', e.target.value)} />
              </label>
            </details>

            <details>
              <summary>Photos</summary>
              {p.photos.map((ph, phIdx) => (
                <div key={phIdx} className="photo-block">
                  <h5>Photo #{phIdx + 1}</h5>
                  <label>
                    Alt text
                    <input value={ph.photoAltText} onChange={e => {
                      setPacks(prev => {
                        const copy = [...prev];
                        copy[i].photos[phIdx].photoAltText = e.target.value;
                        return copy;
                      });
                    }} />
                  </label>
                  <label>
                    Remarks
                    <input value={ph.remarks} onChange={e => {
                      setPacks(prev => {
                        const copy = [...prev];
                        copy[i].photos[phIdx].remarks = e.target.value;
                        return copy;
                      });
                    }} />
                  </label>

                  <div className="photo-urls">
                    <strong>Photo URLs</strong>
                    {ph.photoUrls.map((url, urlIdx) => (
                      <div key={urlIdx} className="url-row">
                        <input value={url} onChange={e => updatePhotoUrl(i, phIdx, urlIdx, e.target.value)} placeholder="https://..." />
                        <button type="button" onClick={() => removePhotoUrl(i, phIdx, urlIdx)}>Remove URL</button>
                      </div>
                    ))}
                    <div>
                      <button type="button" onClick={() => addPhotoUrl(i, phIdx)}>Add URL</button>
                    </div>
                  </div>

                  <div className="photo-actions">
                    <button type="button" onClick={() => removePhoto(i, phIdx)}>Remove Photo</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addPhoto(i)}>Add Photo</button>
            </details>

            <details>
              <summary>Prices</summary>
              <label>
                Price
                <input type="number" step="0.01" value={p.prices.price ?? ''} onChange={e => updateNested(i, 'prices', 'price', e.target.value ? parseFloat(e.target.value) : null)} />
              </label>
              <label>
                Remarks
                <input value={p.prices.remarks} onChange={e => updateNested(i, 'prices', 'remarks', e.target.value)} />
              </label>
            </details>

            <details>
              <summary>Discounts</summary>
              <label>
                Percentage
                <input type="number" step="0.01" value={p.discounts.discountPercentage ?? 0} onChange={e => updateNested(i, 'discounts', 'discountPercentage', parseFloat(e.target.value || 0))} />
              </label>
              <label>
                Start Date
                <input type="date" value={p.discounts.discountStartDate} onChange={e => updateNested(i, 'discounts', 'discountStartDate', e.target.value)} />
              </label>
              <label>
                End Date
                <input type="date" value={p.discounts.discountEndDate} onChange={e => updateNested(i, 'discounts', 'discountEndDate', e.target.value)} />
              </label>
            </details>

            <details>
              <summary>Stock Info</summary>
              <label>
                Product Name
                <input value={p.stockInfo.productName} onChange={e => updateNested(i, 'stockInfo', 'productName', e.target.value)} />
              </label>
              <label>
                Status
                <select value={String(p.stockInfo.productStatus)} onChange={e => updateNested(i, 'stockInfo', 'productStatus', e.target.value === 'true')}>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </label>
              <label>
                Remarks
                <input value={p.stockInfo.remarks} onChange={e => updateNested(i, 'stockInfo', 'remarks', e.target.value)} />
              </label>
            </details>

            <div className="pack-actions">
              <button type="button" onClick={() => removePack(i)}>Remove Pack</button>
            </div>
            <hr />
          </div>
        ))}

        <div className="packs-actions">
          <button type="button" onClick={addPack}>Add Pack</button>
        </div>
      </fieldset>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>Submit Payload</button>
      </div>
    </form>
  );
}