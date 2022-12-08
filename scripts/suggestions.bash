function suggestions() {
    echo
    echo "Suggestions:"
    for VARIABLE in $tasks
    do
        echo "              $VARIABLE             "
    done
    echo
}