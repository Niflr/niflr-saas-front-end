import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Message, Grid, GridColumn, GridRow, Image } from 'semantic-ui-react';
// import { fetchMachineDetails } from '../../actions/index';

const VariantMapModal = (props) => {
  const [maxRow, setMaxRow] = useState(1);
  const [maxColumn, setMaxColumn] = useState(1);
  const [mappedVariants, setMappedVariants] = useState([]);
    console.log("props for modal", props)
  useEffect(() => {
    // const fetchData = async () => {
    // //   await fetchMachineDetails(machineId);
    //   setRowAndColumn();
    // };

    // fetchData();
    setRowAndColumn();
  },  []);

  const setRowAndColumn = () => {
    const mappedVariants = [];
    let maxRow = 1;
    let maxColumn = 1;

    // eslint-disable-next-line no-unused-expressions
    props && props?.scales?.forEach(scale => {
        console.log("current scale and maxRow maxColumn", scale, maxRow, maxColumn);
      const isMapped = !!scale.variantId;

      if (maxRow < scale.row && scale.row !== 99) {
        maxRow = scale.row;
        console.log("maxRow", maxRow);
      }
      if (maxColumn < scale.column && scale.column !== 99) {
        maxColumn = scale.column;
        console.log("maxColumn", maxColumn);
      }

      const mapKey = +(`${scale?.row  }${  scale?.column}`);
      console.log("mapkey", mapKey);
      const name = isMapped ? `${scale?.variant?.product  } ${  scale?.variant?.title}` : 'No Variant Mapped.';
      const imageUrl = isMapped ? scale?.variant?.primaryImageUrl : 'https://storage.googleapis.com/niflr-dev/categories/original/1526046531624-no-product-image.png';
      
      const mapVariant = { key: mapKey, row: scale?.row, column: scale?.column, name, imageUrl, id: scale?.variantId };
      mappedVariants.push(mapVariant);
    });
    console.log("mapped variants", mappedVariants);
    mappedVariants.sort((a, b) => a.key - b.key);
    setMaxRow(maxRow);
    setMaxColumn(maxColumn);
    setMappedVariants(mappedVariants);
  };
console.log("max row and column and mapped variants", maxRow, maxColumn, mappedVariants)
  // eslint-disable-next-line consistent-return
  const renderMappedVariantsRow = () => {
    const eventVariantIdsHash = {};
    // hawkeyeData.eventDetails && hawkeyeData.eventDetails.variantDetails && hawkeyeData.eventDetails.variantDetails.variants.forEach((item) => {
    //   eventVariantIdsHash[item.id] = true;
    // });
  
    if (mappedVariants.length > 0) {
      const rows = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < maxRow; i++) {
          console.log("sliced variants", mappedVariants.slice(i * maxColumn, (i + 1) * maxColumn) )
        const rowVariants = { rowNo: i + 1, variants: mappedVariants.slice(i * maxColumn, (i + 1) * maxColumn) }
        rows.push(rowVariants)
      }
      console.log("rows", rows)
      return rows.map((row, index) => (
        <div style={{display:'flex', flexDirection: 'row', gap: '5px'}} key={index}>
          {row.variants.map((variant, index) => (
            // <GridColumn key={index} style={{ backgroundColor: 'white' }}>
            <div>
              <span>Position: {`${variant.row}R ${variant.column}C`}</span>
              <Image src={variant.imageUrl} style={{ width: '15vw', maxHeight: '200px' }} rounded />
              <span>{variant.name}</span>
            </div>
            // </GridColumn>
          ))}
          </div>
      ));
    }
  };
  

  return (
    <div style={{ padding: '15px', borderRadius: '10px', margin: '10px', textAlign: 'center', maxHeight: '100vh', width: '800px', overflowY: 'auto', backgroundColor: 'white' }}>
      <div style={{fontWeight: 'bold'}}>Variants Mapped to the Machine</div>
      {/* <Grid celled stackable columns={maxColumn}> */}
      <div style={{width: '900px'}}>

        {renderMappedVariantsRow()}
      </div>
      {/* </Grid> */}
    </div>
  );
}

// const mapStateToProps = ({ machines }) => ({ machineVariants: machines });
export default VariantMapModal;
// export default connect(mapStateToProps, {
// //   fetchMachineDetails
// })(VariantMapModal);
