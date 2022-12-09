function getInfo() {
    echo
    
    while true; do
        read -p "$(echo -e DO you want Run $Bold$CYAN"Headless"$NONE)(Y/N)? " yn
        case $yn in
            [Yy]* ) TASK=getInfo HEADLESS=true node src/index.js $numberCategory exit;;
            [Nn]* ) TASK=getInfo HEADLESS=false node src/index.js $numberCategory exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}