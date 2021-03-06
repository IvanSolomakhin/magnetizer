import { MAGNET_PARAMETER, MagnetURI } from '../types';

export default class MagnetEncoder {

	private _data: MagnetURI;
	private _encodedParameters: Array<string>;

	/**
	 * Constructor
	 */
	constructor(data: MagnetURI) {
		this._data = data;
		this._encodedParameters = [];
	}

	/**
	 * Encode magnet uri
	 */
	public encode() {
		this._encodeDisplayName();
		this._encodeLength();
		this._encodeInfoHash();
		this._encodeTracker();
		this._encodeKeywords();
		this._encodeWebSeed();
		this._encodeAcceptableSource();
		this._encodeSource();
		this._encodeManifest();

		return `magnet:?${this._encodedParameters.join('&')}`;
	}

	/**
	 * Encode display name
	 */
	private _encodeDisplayName() {
		if (!this._data.displayNames) {
			return ;
		}

		for (const displayName of this._data.displayNames) {
			this._encodedParameters.push(
				`${MAGNET_PARAMETER.DISPLAY_NAME}=${encodeURIComponent(displayName)}`
			);
		}
	}

	/**
	 * Encode length
	 */
	private _encodeLength() {
		if (this._data.length === null || this._data.length === undefined) {
			return ;
		}

		this._encodedParameters.push(
			`${MAGNET_PARAMETER.LENGTH}=${this._data.length}`
		);
	}

	/**
	 * Encode info hash
	 */
	private _encodeInfoHash() {
		if (!this._data.infoHashes) {
			return ;
		}

		for (const infoHash of this._data.infoHashes) {
			this._encodedParameters.push(
				`${MAGNET_PARAMETER.INFO_HASH}=${infoHash}`
			);
		}
	}

	/**
	 * Encode encode tracker
	 */
	private _encodeTracker() {
		if (!this._data.trackers) {
			return ;
		}

		for (const tracker of this._data.trackers) {
			this._encodedParameters.push(
				`${MAGNET_PARAMETER.TRACKER}=${encodeURIComponent(tracker)}`
			);
		}
	}

	/**
	 * Encode keywords
	 */
	private _encodeKeywords() {
		if (!this._data.keywords || !this._data.keywords.length) {
			return ;
		}

		this._encodedParameters.push(
			`${MAGNET_PARAMETER.KEYWORD}=${this._data.keywords.map(encodeURIComponent).join('+')}`
		);
	}

	/**
	 * Encode web seed
	 */
	private _encodeWebSeed() {
		if (!this._data.webSeeds) {
			return ;
		}

		for (const webSeed of this._data.webSeeds) {
			this._encodedParameters.push(
				`${MAGNET_PARAMETER.WEB_SEED}=${encodeURIComponent(webSeed)}`
			);
		}
	}

	/**
	 * Encode acceptable source
	 */
	private _encodeAcceptableSource() {
		if (!this._data.acceptableSources) {
			return ;
		}

		for (const source of this._data.acceptableSources) {
			this._encodedParameters.push(
				`${MAGNET_PARAMETER.ACCEPTABLE_SOURCE}=${encodeURIComponent(source)}`
			);
		}
	}

	/**
	 * Encode source
	 */
	private _encodeSource() {
		if (!this._data.sources) {
			return ;
		}

		for (const source of this._data.sources) {
			this._encodedParameters.push(
				`${MAGNET_PARAMETER.SOURCE}=${encodeURIComponent(source)}`
			);
		}
	}

	/**
	 * Encode manifest
	 */
	private _encodeManifest() {
		if (!this._data.manifest) {
			return ;
		}

		this._encodedParameters.push(
			`${MAGNET_PARAMETER.MANIFEST}=${encodeURIComponent(this._data.manifest)}`
		);
	}

}
