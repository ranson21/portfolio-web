#!/bin/bash
repo="portfolio-web"
owner="ranson21"

# Set the release variables
release=$(jq -r '.version' <package.json)
tag_name="release-$release"
message=""
data="{\"tag_name\": \"$tag_name\", \"name\":\"$release\",\"body\":\"$message\"}"

# Set the content type for the generated asset
content_type="Content-Type: application/zip"
content_type_params="name=release.zip&label=$release.zip"

# Generate the web assets
echo "Building new release..."
NODE_ENV=production webpack --config webpack/webpack.prod.js

# Compress the asset for release if the build was successful
if [ -d "./build" ] && [ "$1" == "-p" ]; then
  echo "Compressing the generated assets..."
  zip release.zip build/**/*

  # Create the upload URL with the appropriate tags
  echo "Creating release URL $data"
  upload_url=$(curl -L -X POST -d "$data" "https://$owner:$GITHUB_TOKEN@api.github.com/repos/$owner/$repo/releases" | jq -r '.upload_url')
  upload_url="${upload_url%\{*}"

  # Upload the generated release to the URL
  echo "Uploading asset to release to url: $upload_url"
  curl -H "Authorization: token $GITHUB_TOKEN" -H "$content_type" --data-binary @release.zip "$upload_url?$content_type_params"

  # Clean up
  rm -rf release.zip
  rm -rf build/
elif [ ! -d "./build" ]; then
  printf "\n\nBuild failed..."
else
  printf "\n\nBuild successful, skipping publish"
fi
