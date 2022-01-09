import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, saveCategory } from "../actions/requests";
import { AppState } from "../store";
import { updateCategory } from "../actions/requests";
import { Box, Button, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "./Notification";
import { IdType, LooseObject, ReduxState } from "../models/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import useStyles from "./styles";
import { LoginActions } from "../models/user-types";

interface Row {
  id: string;
  name: string;
}

const CategoryView = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );

  const { userInfo } = userLogin;

  const allCategories = useSelector(
    (state: AppState) => state.allCategories.categories
  );

  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEditCommit = (e: any) => {
    if (allCategories.find((c) => c.name === e.value && c._id !== e.id)) {
    } else {
      updateCategory({ _id: e.id, name: e.value }, dispatch, userInfo);
      setMessage("Category name updated successfully!");
      setIsOpen(true);
    }
  };

  const handleDelete = (id: IdType, name: string) => {
    deleteCategory(dispatch, id, userInfo);
    setMessage(`Category with a name '${name}' deleted successfully!`);
    setIsOpen(true);
  };

  const getRows = (): Row[] => {
    const categoryObjects = allCategories.flatMap((category) => {
      return { id: category._id, name: category.name };
    });

    return categoryObjects.sort((a, b) => {
      const value1 = a.name.toUpperCase();
      const value2 = b.name.toUpperCase();

      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      }

      return 0;
    });
  };

  const columns = [
    { field: "name", headerName: "Category Name", width: 400, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (cellValues: any) => (
        <Button
          variant="outlined"
          className={classes.btn}
          startIcon={<DeleteIcon />}
          onClick={() => {
            handleDelete(cellValues.id, cellValues.row.name);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginLeft: 100, marginRight: 100, height: 450 }}>
      <h2 style={{ textAlign: "center", padding: 20 }}>Manage Categories</h2>
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "450px",
            width: "50%",
            display: "flex",
            margin: "auto",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={getRows()}
              columns={columns}
              pageSize={50}
              onCellEditCommit={handleEditCommit}
            />
          </div>
        </div>

        <Formik
          initialValues={{ name: "" }}
          validationSchema={object({
            name: string().required(),
          })}
          validate={(values) => {
            let errors: LooseObject = {};

            if (values.name) {
              const category = allCategories.find(
                (c) => c.name === values.name
              );

              if (category) {
                const nameValidationError =
                  "A category with this name already exists!";
                errors.name = nameValidationError;
              }
            }

            return errors;
          }}
          onSubmit={(values) => {
            console.log("sub");
            saveCategory(dispatch, userInfo, { _id: "", name: values.name });
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h3 style={{ textAlign: "center", paddingBottom: 10 }}>
                Add New Category
              </h3>
              <Box alignSelf="center">
                <TextField
                  name="name"
                  onChange={handleChange}
                  style={{ width: 250 }}
                  variant="standard"
                  label="Enter Category Name"
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                m={3}
              >
                <Button
                  variant="outlined"
                  className={classes.btn}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>

        <Notification message={message} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default CategoryView;
