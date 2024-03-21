import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const StorePlanographPage = (props) => {
  const [maxRow, setMaxRow] = useState(1);
  const [maxColumn, setMaxColumn] = useState(1);
  const [mappedVariants, setMappedVariants] = useState([]);

  useEffect(() => {
    setRowAndColumn();
  }, []);

  const setRowAndColumn = () => {
    let maxRow = 1;
    let maxColumn = 1;
    const mappedVariants = [];

    props?.machines?.machine?.scales?.forEach((scale) => {
      const isMapped = !!scale.variantId;

      if (maxRow < scale.row && scale.row !== 99) {
        maxRow = scale.row;
      }
      if (maxColumn < scale.column && scale.column !== 99) {
        maxColumn = scale.column;
      }

      const mapKey = +`${scale?.row}${scale?.column}`;
      const name = isMapped ? `${scale?.variant?.product} ${scale?.variant?.title}` : 'No Variant Mapped.';
      const imageUrl = isMapped
        ? scale?.variant?.primaryImageUrl
        : 'https://storage.googleapis.com/niflr-dev/categories/original/1526046531624-no-product-image.png';

      const mapVariant = { key: mapKey, row: scale?.row, column: scale?.column, name, imageUrl, id: scale?.variantId };
      mappedVariants.push(mapVariant);
    });

    mappedVariants.sort((a, b) => {
      if (a.row !== b.row) {
        return a.row - b.row;
      }
      return a.column - b.column;
    });
    setMaxRow(maxRow);
    setMaxColumn(maxColumn);
    setMappedVariants(mappedVariants);
  };

  const splitArrayByKey = (array, key) => {
    const resultMap = new Map();
    array.forEach((obj) => {
      const keyValue = obj[key];
      if (!resultMap.has(keyValue)) {
        resultMap.set(keyValue, { rowNo: obj[key], variants: [] });
      }
      resultMap.get(keyValue).variants.push(obj);
    });
    return Array.from(resultMap.values());
  };

  // eslint-disable-next-line consistent-return
  const renderMappedVariantsRow = () => {
    if (mappedVariants.length > 0) {
      const rows = splitArrayByKey(mappedVariants, 'row');
      console.log(rows);
      return (
        <div style={{ overflowY: 'scroll', overflowX: 'scroll', maxHeight: '100vh', maxWidth: '100vw' }}>
          {rows.map((row, rowIndex) => (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2px' }} key={rowIndex}>
              {row.variants.map((variant, variantIndex) => (
                <div
                  key={variantIndex}
                  style={{
                    flex: '0 0 auto',
                    maxWidth: 'calc(100vw - 300px)',
                    width: '250px',
                    border: '1px solid #ccc',
                    padding: '10px',
                  }}
                >
                  <strong>{`R${variant.row} C${variant.column}`}</strong>
                  <img
                    src={variant.imageUrl}
                    alt={variant.name}
                    style={{ width: '100%', maxHeight: '150px' }}
                    className="ui rounded image"
                  />
                  <div>
                    <span>{variant.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div style={{ padding: '15px', textAlign: 'center', backgroundColor: 'white' }}>
      <div style={{ fontWeight: 'bold' }}>Variants Mapped to the Machine</div>
      {renderMappedVariantsRow()}
    </div>
  );
};

const mapStateToProps = ({ isloading, ticket, machines }) => ({
  isloading,
  ticket,
  machines,
});

export default connect(mapStateToProps, {})(StorePlanographPage);
