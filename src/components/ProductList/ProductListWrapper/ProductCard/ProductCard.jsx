import React, { Component } from 'react';
import './ProductCard.scss';

export const ProductCard = ({
	name,
	price: {
		amount,
		currency,
	},
	attributes,
	className,
	thumbnailUrl,
}) => {
	let editor, year;
	attributes.forEach((it) => {
		if(it.attribute.name == 'Editor') {
			editor = it.value.name
		}
		if(it.attribute.name == 'Year') {
			year = it.value.name
		}
	});

	const replaceStaticUrl = (url) => (url && url.replace('static', 'backend-static'));

  return (<div className={`${className} `}>
	  	<img
	  		src={replaceStaticUrl(thumbnailUrl)}
	  	 	className="img-container"
	  		/>
	  	<div>{name}</div>
	  	<div className="row margin-0 padding-0">
		  	<div>{editor}</div>
		  	&nbsp;|&nbsp;
		  	<div>{year}</div>
	  	</div>
	  	<div>{currency}.&nbsp;{amount}</div>
	  </div>
	);
};