import { h } from 'preact';
import { __ } from '@wordpress/i18n';
import { formatPriceWithoutCurrency } from '../utils/priceFormatting.js';
import { getPluginUrl } from '../utils/configHelpers.js';
import { 
	total_base_price,
	total_percentage_price,
	final_price,
	currency_symbol 
} from '../signals/summarySignals.js';

const SummaryCart = ({
	labelPrice,
	labelTotal,
	labelPercentage = null,
	shippingTotal = 0
}) => {
	const pluginUrl = getPluginUrl();
	
	// Čtení ze signálů
	const base_total = total_base_price.value;
	const percentage_total = total_percentage_price.value;
	const cart_total = final_price.value;
	const currency = currency_symbol.value;
	
	const coinsIconUrl = `${pluginUrl}assets/img/coins.svg`;
	const maskStyle = {
		'--mask-img': `url('${coinsIconUrl}')`
	};

	const has_percentage = percentage_total !== 0;

	return (
		<div className="bg-th-orange rounded-[35px] mt-5">
			
			{/* Ikona */}
			<div className="flex items-center gap-x-5 pl-20p large:pl-40p pt-4">
				<div className="w-50p h-50p rounded-full bg-white flex justify-center items-center">
					<a
						href=""
						style={maskStyle}
						className="w-25p h-25p bg-th-orange cs-mask"
					/>
				</div>
			</div>

			{/* Cenové položky */}
			<div className="ml-20p large:ml-100p pb-20p text-white">
				
				{/* Hidden inputs pro PHP */}
				<input type="hidden" name="total_base_price" value={base_total} />
				<input type="hidden" name="total_percentage_price" value={percentage_total} />
				<input type="hidden" name="total_price" value={cart_total} />

				{/* Mezisoučet (Base) */}
				<div className="flex justify-between items-center py-3 border-b border-dashed border-white">
					<span className="af-p25-reg">{labelPrice}</span>
					<span className="af-p25-bold mr-50p">
						<span className="aff-total-base">{formatPriceWithoutCurrency(base_total)}</span>
						<span className="currnency_symbol">{currency}</span>
					</span>
				</div>

				{/* Procenta (pokud existují) */}
				{has_percentage && (
					<div className="flex justify-between items-center py-3 border-b border-dashed border-white">
						<span className="af-p25-reg">
							{labelPercentage || __('Percentage adjustment', 'wpcbooking')}
						</span>
						<span className="af-p25-bold mr-50p">
							<span className={`aff-total-percentage ${percentage_total < 0 ? 'text-red-200' : ''}`}>
								{percentage_total >= 0 ? '+' : ''}{formatPriceWithoutCurrency(percentage_total)}
							</span>
							<span className="currnency_symbol">{currency}</span>
						</span>
					</div>
				)}

				{/* Doprava (volitelná) */}
				{shippingTotal > 0 && (
					<div className="flex justify-between items-center py-3 border-b border-dashed border-white">
						<span className="af-p25-reg">{__('Shipping', 'wpcbooking')}</span>
						<span className="af-p25-bold mr-50p">
							<span>{formatPriceWithoutCurrency(shippingTotal)}</span>
							<span className="currnency_symbol">{currency}</span>
						</span>
					</div>
				)}

				{/* Celkem */}
				<div className="flex justify-between items-center py-3">
					<span className="af-p30">{labelTotal}</span>
					<span className="af-p30 mr-50p">
						<span className="aff-total-price">{formatPriceWithoutCurrency(cart_total)}</span>
						<span className="currnency_symbol">{currency}</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SummaryCart;
