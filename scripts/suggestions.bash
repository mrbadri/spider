function suggestions() {
    echo
    echo -e "$BOLD"Tasks That I Can Do:"$NONE"
    for VARIABLE in $tasks
    do
        echo -e "                     $YELLOW$VARIABLE$NONE            "
    done
    echo
}