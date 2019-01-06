npm run build
mv ./build/.htaccess.bin ./build/.htaccess
mv ./build/index.html ./build/index.php
zs-client.phar packZpk --folder="./" --destination="$TMPDIR" --name="hsc_staging.zpk" || true
zs-client.phar installApp --zpk="$TMPDIR/hsc_staging.zpk" --target="hsc_test_fe" --baseUri="" || true