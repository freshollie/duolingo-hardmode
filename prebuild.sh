PACKAGE_DIR=dist/duolingo-hardmode-package

rm -rf $PACKAGE_DIR

mkdir -p $PACKAGE_DIR

cp manifest.json $PACKAGE_DIR/manifest.json
cp -r src $PACKAGE_DIR/src
cp -r assets $PACKAGE_DIR/assets

echo "Ready to build"