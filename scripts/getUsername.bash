function getUsername() {
    echo
    echo -e "My Task is $BOLD"Get Username"$NONE"
    echo
    echo -e "$BOLD"Categories:"$NONE"
    
    i=0
    
    for VARIABLE in $categories
    do
        echo -e  "           $YELLOW$i$NONE = $VARIABLE           "
        i=$((i+1))
    done
    
    echo
    
    read -p "$(echo -e Please Enter $CYAN"Number Category"$NONE?) " numberCategory

    echo
    
    while true; do
        read -p "$(echo -e DO you want Run $Bold$CYAN"Headless"$NONE)(Y/N)? " yn
        case $yn in
            [Yy]* ) TASK=getUsername HEADLESS=true node src/index.js $numberCategory exit;;
            [Nn]* ) TASK=getUsername HEADLESS=false node src/index.js $numberCategory exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done   
}