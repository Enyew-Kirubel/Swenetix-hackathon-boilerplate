import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Report, ReportFormData } from '../types/report.types';
import * as reportService from '../api/reportService';

interface ReportState {
  reports: Report[];
  selectedReport: Report | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  selectedReport: null,
  isLoading: false,
  error: null,
};

export const fetchAllReports = createAsyncThunk('reports/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await reportService.getAllReports();
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load reports');
  }
});

export const fetchReportById = createAsyncThunk('reports/fetchById', async (id: string, { rejectWithValue }) => {
  try {
    return await reportService.getReportById(id);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load report');
  }
});

export const createNewReport = createAsyncThunk('reports/create', async (data: ReportFormData, { rejectWithValue }) => {
  try {
    return await reportService.createReport(data);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Failed to create report');
  }
});

export const deleteExistingReport = createAsyncThunk('reports/delete', async (id: string, { rejectWithValue }) => {
  try {
    await reportService.deleteReport(id);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Failed to delete report');
  }
});

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearSelectedReport: (state) => {
      state.selectedReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.isLoading = false;
        state.reports = action.payload;
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch One
      .addCase(fetchReportById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action: PayloadAction<Report>) => {
        state.isLoading = false;
        state.selectedReport = action.payload;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create Report
      .addCase(createNewReport.fulfilled, (state, action: PayloadAction<Report>) => {
        state.reports.unshift(action.payload);
      })

      // Delete Report
      .addCase(deleteExistingReport.fulfilled, (state, action: PayloadAction<string>) => {
        state.reports = state.reports.filter((r) => r._id !== action.payload);
        if (state.selectedReport?._id === action.payload) {
          state.selectedReport = null;
        }
      });
  },
});

export const { clearSelectedReport } = reportSlice.actions;
export default reportSlice.reducer;
