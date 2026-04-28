// Official Google Cloud horizontal lockup (icon + wordmark).
// Source: Google Cloud brand kit / Wikimedia Commons mirror, downloaded to
// public/img/google-cloud.svg so we don't hotlink at runtime.
const GoogleCloudLogo = ({ height = 22, ...props }) => (
  <img
    src="img/google-cloud.svg"
    alt="Google Cloud"
    height={height}
    style={{ display: 'block', height: `${height}px`, width: 'auto' }}
    {...props}
  />
);

export default GoogleCloudLogo;
