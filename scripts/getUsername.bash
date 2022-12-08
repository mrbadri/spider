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
    TASK=getUsername  node src/index.js $numberCategory
}