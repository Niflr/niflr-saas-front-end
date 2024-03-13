import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';


import { Message, Grid, Image } from 'semantic-ui-react';
// import {
//   fetchMachineDetails
// } from '../../actions/index';

const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
      height: 'auto',
      backgroundColor: '#fff',
      borderRadius: '10px',
    },
    header: {
      textAlign: 'left',
      fontWeight: 'bold',
      padding: '20px',
    },
    form: {
      width: '80%',
      margin: '0 auto',
    },
    variantTableContainer: {
        display: 'flex',
        overflow: 'auto'
    },
    variantElement: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
    }
  }));

const VariantMapModal = (props) => {
    const classes = useStyles();

    const [maxRow, setMaxRow] = useState(1);
    const [maxColumn, setMaxColumn] = useState(1);
    const [mappedVariants, setMappedVariants] = useState([]);

    console.log("variant map modal called with scales", props)

    // useEffect(()=> {
    //     setRowAndColumn(props)
    // })

    // const setRowAndColumn = (machineVariants) => {
    //     const mappedVariants = [];
    //     let maxRow = 1;
    //     let maxColumn = 1;
    //     machineVariants && machineVariants.scales.map(scale => {
    //       const isMapped = scale.variantId && true;
    //       if (maxRow < scale.row) {
    //         maxRow = scale.row;
    //       }
    //       if (maxColumn < scale.column) {
    //         maxColumn = scale.column;
    //       }
    //       const mapKey = +(scale.row + '' + scale.column);
    //       const name =  isMapped ? scale.variant.product + ' ' + scale.variant.title : `No Variant Mapped.`;
    //       const imageUrl = isMapped
    //         ? scale.variant.primaryImageUrl
    //         : 'https://storage.googleapis.com/niflr-dev/categories/original/1526046531624-no-product-image.png';
    //       const mapVariant = { key: mapKey, name: name, imageUrl: imageUrl, id: scale.variantId };
    //       mappedVariants.push(mapVariant);
    //     })
    //     mappedVariants.sort((a,b) => a.key - b.key);
    //     setMaxRow(maxRow);
    //     setMaxColumn(maxColumn);
    //     setMappedVariants(mappedVariants);
        
    //     // this.setState({ maxRow: maxRow, maxColumn: maxColumn, mappedVariants: mappedVariants });
    //   }

    return (
        <div className={classes.paper}>
            <div className={classes.header}>
                Variants Mapped to the Machine
            </div>
                {props?.scales?.map((scale)=> {
                    console.log("scale", scale.variant)
                    return (
                        <div className={classes.variantTableContainer}>
                            <div className={classes.variantElement}>
                                <div>Position: R{`${scale.row}`}C{`${scale.column}`}</div>
                                {scale.variant ? (
                                    <>
                                    <Image src={scale.variant.primaryImageUrl} style={{ width: '15vw', maxHeight: '210px' }} rounded/>
                                    <div>{scale.variant.product}</div>
                                    </>
                                )
                                    : "No variant mapped here"
                                }
                            </div>
                        </div>
                    )
                    
                })}
      </div>
    )
}

//   const renderMappedVariantsRow = (mappedVariants, maxRow, maxColumn, hawkeyeData) => {
//     const eventVariantIdsHash = {};
//     hawkeyeData.eventDetails && hawkeyeData.eventDetails.variantDetails && hawkeyeData.eventDetails.variantDetails.variants.forEach((item) => {
//       eventVariantIdsHash[item.id] = true;
//     });
//     if (mappedVariants.length > 0) {
//       const rows = [];
//       for (let i=0; i< maxRow; i++) {
//         const rowVariants = { rowNo: i+1, variants: mappedVariants.slice(i*maxColumn, (i+1)*maxColumn) }
//         rows.push(rowVariants)
//       }
//       return rows.map((row, index) => (
//         <Grid.Row divided key={index}>
//           {row.variants.map((variant, index) =>
//             <Grid.Column key={index} style={{ backgroundColor: eventVariantIdsHash[variant.id] ? '#fffa65' : 'white' }}>
//             {
//               <span>Position: {row.rowNo + 'R ' + (index+1) + 'C'}</span>
//             }
//               <Image src={variant.imageUrl} style={{ width: '15vw', maxHeight: '210px' }} rounded/>
//               <span>{variant.name}</span>
//             </Grid.Column>
//           )}
//         </Grid.Row>
//       ))
//     }
//   }

    

  


// const mapStateToProps = ({ machines, hawkeyeData }) => ({ machines, hawkeyeData });

export default VariantMapModal;
